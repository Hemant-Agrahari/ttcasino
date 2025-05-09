import React, { useEffect, useState } from 'react';
import CustomMuiOutlinedInput from './mui-component/CustomMuiOutlinedInput';
import { useTranslation } from 'react-i18next';
import {
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Image from 'next/image';
import {
  useGetAllCategoryQuery,
  useLazyGetModelSubCategoryQuery,
  useLazyGetProviderQuery,
} from '@/redux/games/gameSlice';
import { toast } from 'react-toastify';
import { RTKError } from '@/types/user';
import { handleError } from '@/utils/errorHandler';
import { providerList } from '@/types/game';
import CustomDropdownSelect from './CustomDropdownSelect';

interface Props {
  category: string;
  subcategory: string;
  searchQuery: string;
  sorting: string;
  provider: string;
  handleSearch: (value: string) => void;
  handleSorting: (value: string) => void;
  handleProvider: (value: string) => void;
  handleCategory: (value: string) => void;
  handleSubCategory: (value: string) => void;
}

const HeaderFilterBar: React.FC<Props> = ({
  category,
  subcategory = '',
  searchQuery,
  sorting,
  provider,
  handleSearch,
  handleSorting,
  handleProvider,
  handleCategory,
  handleSubCategory,
}) => {
  const [getProviderList] = useLazyGetProviderQuery();
  const [getSubCategory] = useLazyGetModelSubCategoryQuery();
  const { data: categoryList } = useGetAllCategoryQuery({ sort: 'asc' });
  const [categoriesOptions, setCategoryOptions] = useState<
    {
      name: string;
      value: string;
    }[]
  >([]);
  const [providersList, setProviderList] = useState<providerList[]>([]);
  const [subCategoryList, setSubCategoryList] = useState<string[]>([]);
  const { t } = useTranslation();

  const fetchProvider = async () => {
    const params = { categoryName: category, subcategoryName: subcategory };
    try {
      const res = await getProviderList(params).unwrap();
      if (res.status === 'success') {
        setProviderList(res.data.providers);
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      handleError(error as RTKError);
    }
  };

  const fetchSubCategory = async () => {
    const params = { categoryName: category };
    try {
      const res = await getSubCategory(params).unwrap();
      if (res.status === 'success') {
        setSubCategoryList(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      handleError(error as RTKError);
    }
  };

  const handleCategoryList = () => {
    const blockedCategory = ['Sports Betting'];
    if (categoryList) {
      const categoriesList = categoryList.data.map((item) => {
        if (!blockedCategory.includes(item.categoryName)) {
          return { name: item.categoryName, value: item.categoryName };
        } else {
          return { name: '', value: '' };
        }
      });

      setCategoryOptions(categoriesList);
    }
  };

  useEffect(() => {
    fetchProvider();
  }, [category, subcategory]);

  useEffect(() => {
    fetchSubCategory();
    handleCategoryList();
  }, [category]);

  return (
    <div className="row g-md-3 g-2 mt-1 align-items-center  justify-content-center">
      <div className="col-md-4 col-12">
        <div className=" my-1 search-input GameSearch-input">
          <CustomMuiOutlinedInput
            placeholder={t('Search games')}
            name="searchInput"
            className=""
            startAdornment={
              <InputAdornment position="start">
                <Image
                  src="/assets/images/search_icon.png"
                  alt={t('Search games')}
                  width={30}
                  height={30}
                />
              </InputAdornment>
            }
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(e.target.value)
            }
            fullWidth
          />
        </div>
      </div>
      <div className="col-md-2 col-12">
        <div className="form-floating select-white cursor-pointer">
          <CustomDropdownSelect
            dropdownLabelName={t('Categories')}
            dropdownFieldName="sortByCategory"
            subType={category}
            options={categoriesOptions}
            handleChange={(e: SelectChangeEvent) =>
              handleCategory(e.target.value)
            }
          />
        </div>
      </div>
      <div className="col-md-2 col-4">
        <div className="form-floating select-white cursor-pointer">
          <CustomDropdownSelect
            dropdownLabelName={t('Sub categories')}
            options={subCategoryList.map((item) => ({
              name: item,
              value: item,
            }))}
            subType={subcategory}
            dropdownFieldName="sortBySubcategory"
            handleChange={(e: SelectChangeEvent) => {
              handleSubCategory(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="col-md-2 col-4">
        <div className="form-floating select-white">
          <CustomDropdownSelect
            dropdownLabelName={t('Providers')}
            dropdownFieldName="sortByProvider"
            subType={provider}
            options={providersList.map((item) => ({
              name: item.displayName,
              value: item.providerName,
            }))}
            handleChange={(e: SelectChangeEvent) =>
              handleProvider(e.target.value)
            }
          />
        </div>
      </div>
      <div className="col-md-2 col-4">
        <div className="form-floating select-white">
          <Select
            className="text-capitalize cursor-pointer text-white mui-custom-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            name="sortByName"
            onChange={(e: SelectChangeEvent) => handleSorting(e.target.value)}
            value={sorting}
            MenuProps={{
              MenuListProps: {
                className: 'sorting-mui-dropdown-select',
                sx: {
                  '& .MuiMenuItem-root': {
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    minHeight: '32px',
                    lineHeight: 1.2,
                  },
                },
              },
              PaperProps: {
                sx: {
                  maxHeight: {
                    xs: 200,
                    sm: 300,
                    md: 400,
                  },
                },
              },
            }}
            fullWidth
          >
            <MenuItem value="new" className="text-capitalize custom-dropdown-menu-items">
              {t('new game')}
            </MenuItem>
            <MenuItem value="old" className="text-capitalize custom-dropdown-menu-items">
              {t('old game')}
            </MenuItem>
            <MenuItem value="asc" className='custom-dropdown-menu-items'>{t('A TO Z')}</MenuItem>
            <MenuItem value="desc" className='custom-dropdown-menu-items'>{t('Z TO A')}</MenuItem>
          </Select>
          <label htmlFor="floatingSelect" className="label-dropdown">
            {t('Sort By')}
          </label>
        </div>
      </div>
    </div>
  );
};
export default HeaderFilterBar;
