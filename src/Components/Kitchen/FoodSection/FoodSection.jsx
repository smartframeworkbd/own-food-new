import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseURL } from "../../../Helper/config";
import OfferItems from "../OfferItems/OfferItems";
import { Nav } from "react-bootstrap";
import FeaturedItems from "../FeaturedItems/FeaturedItems";
import "./FoodSection.css";
const FoodSection = () => {
  const { id } = useParams();
  const [foodGroups, setFoodGroups] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [foodType, setFoodType] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([{ _id: "Asian", categoryName: "Asian" }]);
  const [activeCategory, setActiveCategory] = useState("Asian");
  const sectionRefs = useRef({});
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
            if (featured.length < 4) {
              featured.push(item);
            }
            allItems.push(item);
          }

          if (allItems.length > 0) {
            grouped.push({ _id: group._id, categoryName: group.categoryName, items: allItems });
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
          { _id: "Asian", categoryName: "Asian" },
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

  // const filteredFoodGroups = useMemo(() => {
  //   return foodGroups.map(group => {
  //     if (activeCategory === "default") {
  //       return group;
  //     }
  //     const filteredItems = group.items.filter(item => item.category === activeCategory);
  //     return { ...group, items: filteredItems };
  //   }).filter(group => group.items.length > 0);
  // }, [foodGroups, activeCategory]);
  const handleCategoryClick = (selectedKey) => {
    setActiveCategory(selectedKey);

  
    const ref = sectionRefs.current[selectedKey];
    console.log(ref,selectedKey, "ref")
    if (ref && ref.scrollIntoView) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <div className="seller-food-section">
      <FeaturedItems items={featuredItems} loading={loading} setFoodType={setFoodType} foodType={foodType} />

      <div className="container party-cack-container">
        <Nav
          variant="tabs"
          activeKey={activeCategory}
          className="category-nav"
          onSelect={handleCategoryClick}
        >
          {categories.map((cat, index) => (
            <Nav.Item key={cat._id || index}>
              <Nav.Link eventKey={cat._id} className="category-tab">
                {cat.categoryName}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {foodGroups.map((group, index) => {
          const categoryKey =  group.categoryName;
          // console.log(categoryKey, "categoryKey")
          return <div key={categoryKey}
            ref={(el) => (sectionRefs.current[categoryKey] = el)}
                        style={{ scrollMarginTop: "200px" }}>


            <OfferItems
              key={index}
              title={group.categoryName || "Unnamed Category"}
              items={group.items}
              loading={loading}
            />
          </div>
        }

        )}
      </div>
    </div>
  );
};

export default FoodSection;
