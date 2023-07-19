import {
  Bars3Icon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import vi from "date-fns/locale/vi";
import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setSearch } from "src/redux/slices/Search";
import "./Header.scss";
import logo from "/img/airbnb.jpg";
import { deburr } from "lodash";
import { tokenCybersoft } from "src/constant";
import { logout } from "src/redux/slices/Authentication";

function Header() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.searchReducer);
  const [searchInput, setSearchInput] = useState(search.location || "");
  const [startDate, setStartDate] = useState(
    search.startDate ? new Date(search.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    search.endDate ? new Date(search.endDate) : new Date()
  );
  const [numberOfGuests, setNumberOfGuests] = useState(
    search.numberOfGuests || 1
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [maViTri, setMaViTri] = useState("");
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const getViTri = async () => {
    try {
      const response = await axios.get(
        "https://airbnbnew.cybersoft.edu.vn/api/vi-tri",
        {
          headers: {
            tokenCybersoft: tokenCybersoft,
          },
        }
      );
      const listViTri = response.data.content;
      setAllSuggestions(listViTri);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorMessage = err.response.data.content;
        alert(errorMessage);
      } else {
        alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

  useEffect(() => {
    getViTri();
  }, [searchInput]);
  const handleSearch = (value) => {
    setSearchInput(value);
    const filteredSuggestions = allSuggestions.filter((item) =>
      deburr(item.tinhThanh.toLowerCase()).startsWith(
        deburr(value.toLowerCase())
      )
    );
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    const location = `${suggestion.tenViTri} - ${suggestion.tinhThanh}`;
    setSearchInput(location);
    setShowSuggestions(false);
    setMaViTri(suggestion.id);
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const handleNumberOfGuestsChange = (e) => {
    const value = e.target.value;
    setNumberOfGuests(value);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSubmit = () => {
    dispatch(
      setSearch({
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests,
        maViTri,
      })
    );
    clearInput();
  };

  const clearInput = () => {
    setSearchInput("");
  };
  const suggestionsRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  const isLoggedIn = useSelector((state) => state.AuthReducer.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  return (
    <header>
      <div className="header-container d-flex justify-content-between align-items-center py-3">
        <div className="header-logo">
          <NavLink to={"/"}>
            <img className="logo-img w-50" src={logo} alt="logo" />
          </NavLink>
        </div>

        <div className="d-flex search-container bg-white align-items-center">
          <input
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Nhập tỉnh thành"
            className="text-center"
            style={{ outline: "none ", border: "none" }}
          />
          <NavLink
            to={"/"}
            className="d-none d-md-inline-flex  search-icon text-black "
          >
            <MagnifyingGlassIcon />
          </NavLink>

          {showSuggestions && (
            <div className="suggestions-container" ref={suggestionsRef}>
              {filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  {`${suggestion.tenViTri} - ${suggestion.tinhThanh}`}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="header-user d-flex justify-content-end align-items-center ">
          {isLoggedIn ? <p>Chào mừng quý khách</p> : <p>Đón tiếp khách</p> }

          <GlobeAltIcon className="global-icon text-white" />
          <div className="user-block">
            <div
              className="menu-user d-flex justify-content-between px-2 py-1"
              onClick={handleToggleDropdown}
            >
              <Bars3Icon className="menu-icon" />
              <UserCircleIcon className="user-circle-icon" />
            </div>

            {isDropdownOpen && (
              <div className="dropdown-content">
                {isLoggedIn ? (
                  <NavLink
                    to={"/"}
                    className="text-decoration-none text-black access-link"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      to={"/register"}
                      className="text-decoration-none text-black access-link"
                      onClick={handleLinkClick}
                    >
                      Đăng ký
                    </NavLink>
                    <br />
                    <NavLink
                      to={"/login"}
                      className="text-decoration-none text-black access-link"
                      onClick={handleLinkClick}
                    >
                      Đăng nhập
                    </NavLink>
                  </>
                )}
                <div></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {searchInput && (
        <div className="date-range-container mx-auto">
          <DateRangePicker
            locale={vi}
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
          />
          <div className="d-flex align-items-center">
            <h2>Khách</h2>
            <UsersIcon className="user-icon" />
            <input
              value={numberOfGuests}
              onChange={handleNumberOfGuestsChange}
              type="number"
              min={1}
              className="input-guest"
            />
          </div>
          <div className="d-flex">
            <button onClick={clearInput} className="cancel-button">
              Hủy
            </button>
            <NavLink to="/search-by-location" activeClassName="active-link">
              <button onClick={handleSubmit} className="search-button">
                Tìm kiếm
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
