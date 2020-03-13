import Link from "next/link"

export default function Layout() {
  return (
    <>
      <NavLink href="/" text="Home" />
      <NavLink href="/dashboard" text="Dashboard" />
      <NavLink href="/dashboard-management" text="Dashboard Management" />
    </>
  )
}

const NavLink = ({ href = "/", text = "" }) => (
  <Link href={href}>
    <a
      style={{
        display: "block",
        textDecoration: "none",
        background: "#ccc",
        padding: "6px 10px",
        marginBottom: "6px"
      }}
    >
      {text}
    </a>
  </Link>
)
