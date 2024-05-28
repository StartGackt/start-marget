import ProductRow from "./components/ProductRow";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
        <h1>Start Over the best tech</h1>
        <h1 className="text-violet-500">Template</h1>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
          The technology landscape is constantly evolving, and staying ahead of the curve is essential for businesses and individuals alike. "Start Over the Best Tech" aims to provide comprehensive insights into the latest technological advancements, trends, and innovations that are reshaping our world. This template serves as a guide to understanding and leveraging cutting-edge technology for maximum impact.
        </p>
      </div>
      <ProductRow category="news" />
      <ProductRow category="product" />
      <ProductRow category="about" />
      <ProductRow category="blog" />
    </section>
  );
}
