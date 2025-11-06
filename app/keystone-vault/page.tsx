import data from "@/data/products.json";
import ProductList from "@/app/components/ProductList";

export const dynamic = "force-dynamic";

export default function Page() {
  const items = (data as any).keystone || [];
  return <ProductList items={items} heading="Keystone Bots, Models & Software Empire" />;
}
