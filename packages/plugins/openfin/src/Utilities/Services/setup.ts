declare var fin: any;
declare var chrome: any;
export const setup = async () => {
  const excelAssetAlias = 'excel-api-addin';
  const excelServiceUuid = '886834D1-4651-4872-996C-7B2578E953B9';
  const installFolder = '%localappdata%\\OpenFin\\shared\\assets\\excel-api-addin';
  const servicePath = 'OpenFin.ExcelService.exe';
  const addInPath = 'OpenFin.ExcelApi-AddIn.xll';
  const excelServiceEventTopic = 'excelServiceEvent';
  try {
    let serviceIsRunning = await isServiceRunning();
    let assetInfo: any = await getAppAssetInfo();
    if (serviceIsRunning) {
      console.log('Service Already Running: Skipping Deployment and Registration');
      return;
    }
    if (assetInfo.version === localStorage.installedAssetVersion && !assetInfo.forceDownload) {
      console.log(
        'Current Add-In version previously installed: Skipping Deployment and Registration'
      );
    } else {
      await deploySharedAssets();
      console.log('deployed shared asset');
      await tryInstallAddIn();
      console.log('installed addin');
      localStorage.installedAssetVersion = assetInfo.version;
    }
    console.log('starting Excel Service');
    await startExcelService();
    console.log('Excel Service Started');
  } catch (err) {
    console.error(err);
  }
  // Technically there is a small window of time between when the UUID is
  // registered as an external application and when the service is ready to
  // receive commands. This edge-case will be best handled in the future
  // with the availability of plugins and services from the fin API
  function isServiceRunning() {
    return new Promise((resolve, reject) => {
      fin.desktop.System.getAllExternalApplications((extApps: any) => {
        var excelServiceIndex = extApps.findIndex(
          (extApp: any) => extApp.uuid === excelServiceUuid
        );
        if (excelServiceIndex >= 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  function getAppAssetInfo() {
    return new Promise((resolve, reject) => {
      fin.desktop.System.getAppAssetInfo({ alias: excelAssetAlias }, resolve, reject);
    });
  }
  function deploySharedAssets() {
    return new Promise((resolve, reject) => {
      fin.desktop.Application.getCurrent().getManifest((manifest: any) => {
        fin.desktop.System.launchExternalProcess(
          {
            alias: excelAssetAlias,
            target: servicePath,
            arguments: `-d "${installFolder}" -c ${manifest.runtime.version}`,
            listener: (result: any) => {
              console.log(`Asset Deployment completed! Exit Code: ${result.exitCode}`);
              resolve();
            },
          },
          () => console.log('Deploying Shared Assets'),
          (err: any) => reject(err)
        );
      });
    });
  }
  function tryInstallAddIn() {
    return new Promise((resolve, reject) => {
      fin.desktop.System.launchExternalProcess(
        {
          path: `${installFolder}\\${servicePath}`,
          arguments: `-i "${installFolder}"`,
          listener: (result: any) => {
            if (result.exitCode === 0) {
              console.log('Add-In Installed');
            } else {
              console.warn(`Installation failed. Exit code: ${result.exitCode}`);
            }
            resolve();
          },
        },
        () => console.log('Installing Add-In'),
        (err: any) => reject(err)
      );
    });
  }
  function startExcelService() {
    return new Promise((resolve, reject) => {
      var onExcelServiceEvent: any;
      fin.desktop.InterApplicationBus.subscribe(
        '*',
        excelServiceEventTopic,
        (onExcelServiceEvent = () => {
          fin.desktop.InterApplicationBus.unsubscribe(
            '*',
            excelServiceEventTopic,
            onExcelServiceEvent
          );
          // The channel provider should eventually move into the .NET app
          // but for now it only being used for signalling
          fin.desktop.InterApplicationBus.Channel.create(excelServiceUuid);
          resolve();
        })
      );
      chrome.desktop.getDetails(function(details: any) {
        fin.desktop.System.launchExternalProcess(
          {
            target: `${installFolder}\\${servicePath}`,
            arguments: '-p ' + details.port,
            uuid: excelServiceUuid,
          },
          (process: any) => {
            console.log('Service Launched: ' + process.uuid);
          },
          (error: any) => {
            reject('Error starting Excel service');
          }
        );
      });
    });
  }
};
