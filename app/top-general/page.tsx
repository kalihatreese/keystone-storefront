import ProductList from "../components/ProductList";
export default function Page(){
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Keystone • Top Items</h1>
      <ProductList/>
    </main>
  );
}
