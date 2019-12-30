import Modal from '../../../../App_Scripts/components/Modal';

import '../../../../App_Scripts/components/Modal/base.scss';
import '../../../../App_Scripts/components/Modal/style.scss';

import React, { useState } from 'react';

export default () => {
  if (!global.document) {
    return null;
  }
  const [visible, setVisible] = useState(true);
  const toggle = () => setVisible(!visible);
  return (
    <div>
      <button onClick={toggle}>toggle modal</button> - {visible ? 'visible' : 'hidden'}
      <Modal isOpen={visible} style={{ border: '1px solid red' }}>
        modal content here
      </Modal>
      <div style={{ height: '200vh', padding: 20, border: '2px solid blue' }}>
        Esse nostrud dolor veniam proident. Magna magna sit pariatur nostrud voluptate. Ex sint
        adipisicing cillum dolore amet. Do exercitation laborum culpa minim aliqua ea nostrud. Amet
        qui dolor aliquip eiusmod deserunt reprehenderit esse do nostrud adipisicing veniam ea
        occaecat. Cillum quis voluptate nisi eiusmod nostrud Lorem enim. Cillum eu labore magna
        minim incididunt. Dolore labore exercitation exercitation deserunt duis qui enim aute dolore
        sint reprehenderit magna consectetur sint. Voluptate fugiat sit ea occaecat nulla. In
        consequat aliquip magna ad commodo est. Ea elit culpa culpa duis labore officia tempor minim
        do veniam. Voluptate aliqua esse sint sint ea Lorem exercitation tempor ad mollit dolor
        nulla dolor mollit. Sunt sit mollit cupidatat in voluptate ad non pariatur laboris fugiat
        non. Lorem fugiat voluptate nostrud aute consectetur. Minim eiusmod commodo ullamco laborum
        ex. Quis proident laboris aute nulla dolor. Qui ex consequat ex fugiat qui nulla. Ad nisi ex
        nostrud deserunt id duis anim aute occaecat enim. Consequat qui id sunt duis reprehenderit
        sint laborum magna commodo aute excepteur aliqua. Mollit ut labore laborum eiusmod labore ut
        aute dolore pariatur. Consequat duis irure aliquip cupidatat esse esse labore dolore. Veniam
        voluptate amet consectetur esse commodo do amet. Occaecat anim occaecat magna laborum elit
        aliqua incididunt. Lorem labore cupidatat minim ipsum occaecat eu. Sint sunt ullamco
        reprehenderit deserunt pariatur eiusmod elit non dolor adipisicing occaecat minim. Non
        consequat in duis culpa deserunt velit elit nulla voluptate irure cupidatat incididunt
        laborum ipsum. Ex est esse mollit voluptate do excepteur velit magna eu officia nostrud
        aliquip. Consequat et ea nulla cillum. Eiusmod est pariatur velit dolore ullamco qui enim
        cupidatat id. Anim adipisicing laboris laboris exercitation elit dolore est velit laborum id
        in minim. Occaecat sint irure dolor minim velit ex eu quis in. Laborum adipisicing tempor
        tempor laboris. Consequat mollit amet consequat minim. Consectetur aute aliqua esse elit
        sint dolore esse irure enim. Ad proident id commodo exercitation. Pariatur est ullamco enim
        labore consequat est. Elit culpa minim amet mollit ut aliquip eu irure enim amet ad. Mollit
        reprehenderit ut fugiat enim excepteur. Sit eu Lorem mollit ex consectetur nulla tempor
        nostrud laborum tempor do amet consectetur duis. Velit aute sint velit exercitation eu
        fugiat velit duis consectetur proident minim excepteur. Enim ea labore sit cillum minim ea
        est nisi pariatur consectetur consectetur eu voluptate. Sunt ipsum velit deserunt qui qui
        amet officia cupidatat do dolore cillum adipisicing amet. Eu ullamco ad excepteur voluptate
        pariatur nulla irure exercitation. Do ea ea mollit eu consectetur fugiat nisi aliqua culpa
        aliquip qui ad mollit. Sit in esse nostrud occaecat voluptate ad velit et nisi consectetur
        officia esse minim in. Aliqua occaecat consequat culpa veniam qui incididunt labore.
        Occaecat duis qui aute nulla duis deserunt irure laboris aliqua ut aliqua sint qui.
      </div>
    </div>
  );
};
