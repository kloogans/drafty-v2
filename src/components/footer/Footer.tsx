import Link from "next/link"

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer className={`w-full px-2`}>
      <div className="text-white text-sm flex items-center justify-center gap-2 mx-auto">
        <Link href="/terms">
          <a
            className="hover:text-amber-400 focus:text-amber-400"
            title="Terms and Conditions"
          >
            Terms
          </a>
        </Link>
        <span className="px-1">&middot;</span>
        <Link href="/privacy">
          <a
            className="hover:text-amber-400 focus:text-amber-400"
            title="Privacy Policy"
          >
            Privacy
          </a>
        </Link>
      </div>
      <p className="mx-auto text-xs text-white/70 text-center leading-none py-2">
        © {new Date().getFullYear()} Drafty
      </p>
    </footer>
  )
}

export default Footer
