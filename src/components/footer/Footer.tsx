import Link from "next/link"

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer className={`w-full px-2 py-4`}>
      <div className="text-white text-sm flex items-center justify-center gap-2 mx-auto">
        <Link href="/terms">
          <a
            className="hover:text-amber-400 focus:text-amber-400"
            title="Terms and Conditions"
          >
            Terms
          </a>
        </Link>
        <span className="px-2">&middot;</span>
        <Link href="/privacy">
          <a
            className="hover:text-amber-400 focus:text-amber-400"
            title="Privacy Policy"
          >
            Privacy Policy
          </a>
        </Link>

        <span className="px-2">&middot;</span>
        <Link href="/cookies">
          <a
            className="hover:text-amber-400 focus:text-amber-400"
            title="Cookie Policy"
          >
            Cookie Policy
          </a>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
