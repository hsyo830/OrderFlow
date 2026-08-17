import MenuIcon from "../icons/MenuIcon";
import UserIcon from "../icons/UserIcon";
import Container from "./Container";

const Header = () => {
  return (
    <header className="flex w-full items-center justify-center border-b">
      <Container>
        <div className="flex w-full items-center justify-between py-5">
          <div className="text-brand cursor-pointer text-xl font-bold">TICKET</div>

          <div className="hidden cursor-pointer items-center gap-9 md:text-sm md:font-medium lg:flex">
            <div className="hover:text-brand-hover active:text-brand-active">홈</div>
            <div className="hover:text-brand-hover active:text-brand-active">카테고리</div>
            <div className="hover:text-brand-hover active:text-brand-active">예매안내</div>
            <div className="hover:text-brand-hover active:text-brand-active">마이페이지</div>
          </div>

          <div className="flex items-center gap-4 md:gap-7">
            <MenuIcon className="text-brand cursor-pointer lg:hidden" />
            <UserIcon className="text-brand cursor-pointer" />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
