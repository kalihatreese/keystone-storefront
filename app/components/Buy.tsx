export default function Buy({name, price}:{name:string;price:number}){
  const url = `https://paypal.me/kalihatreese/${Number(price||0)}`;
  return (
    <a href={url} target="_blank" rel="noreferrer" style={{marginLeft:8,textDecoration:'underline'}}>
      Buy Now
    </a>
  );
}
