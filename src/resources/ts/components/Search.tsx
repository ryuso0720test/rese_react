
import "../../../public/css/search.css";
import { CiSearch } from "react-icons/ci";
import "../../../public/css/app.css";
import { FC, useState, useEffect } from "react";
import { Item } from "../type/Item";
import axios from 'axios';

const Search = (props) => {

    const [areas, setAreas] = useState<Item>([]);
    const [categories, setCategories] = useState<Item>([]);
    const [selectedArea, setSelectedArea] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [inputWord, setInputWord] = useState<string>();

    const initialValues = { word: 0 };
    const [search, setSearch] = useState(initialValues);

    const handleSelectArea = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedArea(Number(event.target.value));
        console.log(event.target.value);
        props.handleValueChange({
            area_id: Number(event.target.value),
            category_id: Number(selectedCategory),
            inputWord: search.word
        });
    };
    const handleSelectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory( Number(event.target.value));
        props.handleValueChange({
            area_id: Number(selectedArea),
            category_id: Number(event.target.value),
            inputWord: search.word,
        });
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
        props.handleValueChange({
            area_id: Number(selectedArea),
            category_id: Number(selectedCategory),
            inputWord: e.target.value,
        });
    };

    // areas取得API
    const getAreas = async () => {
        axios.get('/api/areas').then(response => {
          setAreas(response.data.data);
        })
        .catch(() => {
          console.log('地域情報の取得失敗');
        });
    }
    // category取得API
    const getCategories = async () => {
        axios.get('/api/categories').then(response => {
          setCategories(response.data.data);
        })
        .catch(() => {
          console.log('カテゴリーの取得失敗');
        });
    }

    useEffect(() => {
        getCategories();
        getAreas();
    }, []);

    return (
    <>
        <form className="search-form" action="/search" method="post">
            <div className="search-content">
                    <select
                        name="area"
                        className="search__area"
                        onChange={handleSelectArea}
                    >
                        <option value="" >All area</option>
                        {
                            areas.map(
                                (area: Item) => (
                                    <option key={area.id} value={area.id}>{area.name }</option>
                                )
                            )
                        }
                </select>
                    <select
                        name="area"
                        className="search__area"
                        onChange={handleSelectCategory}
                    >
                        <option value="0" >All genre</option>
                        {
                            categories.map(
                                (category: Item) => (
                                    <option key={category.id} value={category.id}>{category.name }</option>
                                )
                            )
                        }
                </select>
                <CiSearch className="icon" size="1.5rem"/>
                    <input type="search" name="search" placeholder="キーワードを入力"
                        onChange={(e) => handleChange(e)} />
            </div>
        </form>
    </>
    )
};
export default Search;
