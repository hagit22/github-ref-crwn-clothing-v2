
import './categories.styles.scss'
import CategoryItem from './components/category-item/category-item.component';


const App = () => {

const categories = 
  [
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
    },
    {
      "id": 4,
      "title": "womens",
      "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
    },
    {
      "id": 5,
      "title": "mens",
      "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
    }
  ]
  
  // I still dont understand about the code below:
  // 1) when to use 'return(..)'  and when not (e.g. the map function below)
  // 2) when to use {} like in the code below...
  return (
    <div className="categories-container">
      {/* {title, id} in the map argument is deconstruction, instead of sending just category (without {}) 
      and referencing below with {category.title} etc. */}
      {/*{categories.map(({title, id, imageUrl}) => ( */} 
      {categories.map((category) => ( 
        <CategoryItem key={category.id} category={category}/>
      ))}
    </div>
  );
}

export default App;


