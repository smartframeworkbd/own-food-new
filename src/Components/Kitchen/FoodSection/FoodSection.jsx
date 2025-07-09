import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseURL } from "../../../Helper/config";
import OfferItems from "../OfferItems/OfferItems";
import { Nav } from "react-bootstrap";
import FeaturedItems from "../FeaturedItems/FeaturedItems";

const FoodSection = () => {
  const { id } = useParams();
  const [foodGroups, setFoodGroups] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [foodType, setFoodType] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([{ _id: "default", categoryName: "Default" }]);
  const [activeCategory, setActiveCategory] = useState("default");

  // Fetch foods
  const fetchFood = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BaseURL}/get-filter-food-by-seller/${id}`, {
        params: { foodType }
      });

      const data = res.data.data || [];
      const grouped = [];
      const featured = [];

      data.forEach(group => {
        if (Array.isArray(group.items)) {
          const allItems = [];
          for (const item of group.items) {
            if (featured.length<4) { //item.isFeatured
              featured.push(item);
            }
            allItems.push(item);
          }

          if (allItems.length > 0) {
            grouped.push({ _id: group._id, items: allItems });
          }
        }
      });

      setFeaturedItems(featured);
      setFoodGroups(grouped);
    } catch (error) {
      console.error("Error fetching food:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BaseURL}/get-subcategory-by-seller/${id}`);
      if (res.data?.data?.length > 0) {
        const newCategories = [
          { _id: "default", categoryName: "Default" },
          ...res.data.data
        ];
        setCategories(newCategories);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchFood();
    fetchCategories();
  }, [id, foodType]);

  const filteredFoodGroups = useMemo(() => {
    return foodGroups.map(group => {
      if (activeCategory === "default") {
        return group;
      }
      const filteredItems = group.items.filter(item => item.category === activeCategory);
      return { ...group, items: filteredItems };
    }).filter(group => group.items.length > 0); 
  }, [foodGroups, activeCategory]);

  return (
    <div>
      <FeaturedItems items={featuredItems} loading={loading} setFoodType={setFoodType} foodType={foodType}/>

      <div className="container party-cack-container">
        <Nav
          variant="tabs"
          activeKey={activeCategory}
          className="category-nav"
          onSelect={(selectedKey) => setActiveCategory(selectedKey)}
        >
          {categories.map((cat, index) => (
            <Nav.Item key={cat._id || index}>
              <Nav.Link eventKey={cat._id} className="category-tab">
                {cat.categoryName}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {filteredFoodGroups.map((group, index) => (
          <OfferItems
            key={index}
            title={group._id}
            items={group.items}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodSection;
