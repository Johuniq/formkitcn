import { Layers } from "lucide-react";
import Link from "next/link";

const Footer = () => (
  <footer
    className="border-t border-border/40 py-12 px-6"
    role="contentinfo"
    aria-label="Site footer"
  >
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="font-mono text-sm font-semibold text-foreground">
            formkitcn
          </span>
          <span className="text-xs text-muted-foreground/40 font-mono">
            v1.0
          </span>
        </div>

        {/* Footer navigation for SEO crawlability */}
        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-4 text-xs text-muted-foreground/60 font-mono">
            <li>
              <Link
                href="/#features"
                className="hover:text-foreground transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/#how-it-works"
                className="hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                href="/#templates"
                className="hover:text-foreground transition-colors"
              >
                Templates
              </Link>
            </li>
            <li>
              <Link
                href="/builder"
                className="hover:text-foreground transition-colors"
              >
                Builder
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/Johuniq/formkitcn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-border/20">
        <p className="text-[11px] text-muted-foreground/30 font-mono">
          © {new Date().getFullYear()}{" "}
          <Link
            href="/"
            className="hover:text-muted-foreground transition-colors"
          >
            formkitcn
          </Link>
          . A{" "}
          <a
            href="https://github.com/Johuniq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground transition-colors"
          >
            Johuniq
          </a>{" "}
          project. Open source under MIT license.
        </p>
        <p className="text-[11px] text-muted-foreground/30 font-mono">
          Part of{" "}
          <a
            href="https://www.jolyui.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/60 hover:text-primary transition-colors underline underline-offset-2"
          >
            jolyui
          </a>{" "}
          · Built for developers who ship fast.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
