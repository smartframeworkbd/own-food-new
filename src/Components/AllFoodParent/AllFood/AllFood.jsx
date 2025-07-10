import React, { useEffect, useState } from 'react'
import LeftFilter from '../LeftFilter/LeftFilter'
import Search from '../Search/Search'
import DailyDeals from '../DailyDeals/DailyDeals'
import FoodCardPreOrderReview from '../../Common/Cards/FoodCardPreorderReview/FoodCardPreOrderReview'
import './AllFood.css'
import axios from 'axios'
import { BaseURL } from '../../../Helper/config'
const AllFood = () => {
  const [filters, setFilters] = useState({});
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("")
  // Convert filters object to query string
  const buildQueryParams = (obj) => {
    const params = new URLSearchParams();
    if (search) {
      params.append("searchTerm", search)
    }
    for (let key in obj) {
      if (Array.isArray(obj[key])) {
        obj[key].forEach(val => params.append(key, val));
      } else if (obj[key] !== "" && obj[key] !== null && obj[key] !== undefined) {
        params.append(key, obj[key]);
      }
    }
    return params.toString();
  };

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const query = buildQueryParams(filters);
      const res = await axios.get(`${BaseURL}/get-all-food?${query}`);
      console.log(res)
      if (res.data.status === "Success") {
        setFoodList(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch food:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when filters change
  useEffect(() => {
    fetchFoods();
  }, [filters, search]);

  return (
    <div className="container all-food">
      <div className="row">
        <div className="col-md-3 d-none d-md-block">
          <LeftFilter filters={filters} setFilters={setFilters} />
        </div>

        <div className="col-md-9">
          {/* Main content here (food items etc.) */}

          <Search setSearch={setSearch} setFilters={setFilters} />

          <DailyDeals />
          <h5 className="Foodcard-title">Indian</h5>
          <div className="row">
            {foodList.map((item, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <FoodCardPreOrderReview item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllFood