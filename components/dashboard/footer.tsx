import Link from "next/link"

const footerLinks = {
  Product: ["Feature", "Pricing", "Integration", "API"],
  Company: ["About", "Career", "Press", "Blog"],
  Support: ["Help", "Contact", "Security", "Privacy"],
  Legal: ["Terms of", "Privacy", "Cookie"],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground">{category}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 LedgerFlow. All rights
          </p>
        </div>
      </div>
    </footer>
  )
}
