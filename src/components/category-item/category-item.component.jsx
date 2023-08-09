import './category-item.styles.scss'

const CategoryItem = ({category}) => {  // destructuring from props.category 
    const {title, imageUrl} = category;
    return (
        <div className="category-container">
          <div className="background-image" 
               style= // 'style' is HTML | the parameter is an object literal which should be enclosed in double brackets {{}}
                {{backgroundImage: `url(${imageUrl})`,}} // 'url' is CSS  |  This line uses 'String Interpolation' with ${} & and Backticks!!
          />
          <div className="category-body-container">
            <h2>{title}</h2> {/* Using curly braces for the dynamic 'title' value */}
            <p>Shop Now</p>
          </div>
        </div>
    );
};

export default CategoryItem