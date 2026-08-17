import Container from "@/components/layout/Container";

import CategoryList from "./components/CategoryList";
import MainBanner from "./components/MainBanner";
import SearchBar from "./components/SearchBar";

const MainPage = () => {
  return (
    <div className="w-full">
      <MainBanner />
      <div className="relative z-10 -mt-8 md:-mt-9">
        <SearchBar />
      </div>
      <div className="mt-10 flex justify-center">
        <Container>
          <CategoryList />
        </Container>
      </div>
    </div>
  );
};

export default MainPage;
