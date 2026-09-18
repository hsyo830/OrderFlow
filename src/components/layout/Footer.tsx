import Link from "next/link";

import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-dark-surface text-subtle mt-20 flex w-full justify-center py-15 text-sm md:mt-30 md:py-20">
      <Container>
        <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
          <div>© {new Date().getFullYear()} 자리요! All rights reserved.</div>
          <div>
            <Link
              href="https://github.com/hsyo830/OrderFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              GitHub 바로가기 &gt;
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
