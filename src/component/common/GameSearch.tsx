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
import { useRouter } from 'next/router';
import {
  useLazyGetProviderQuery,
  useLazyGetSubCategoryQuery,
} from '@/redux/games/gameSlice';
import { toast } from 'react-toastify';
import { RTKError } from '@/types/user';
import { handleError } from '@/utils/errorHandler';
import { providerList } from '@/types/game';
import CustomDropdownSelect from './CustomDropdownSelect';

interface Props {
  mainType: string;
  subType: string;
  searchQuery: string;
  sorting: string;
  provider: string;
  handleSearch: (value: string) => void;
  handleSorting: (value: string) => void;
  handleProvider: (value: string) => void;
}

const GameFilterBar: React.FC<Props> = ({
  mainType,
  subType = '',
  searchQuery,
  sorting,
  provider,
  handleSearch,
  handleSorting,
  handleProvider,
}) => {
  const [getProviderList] = useLazyGetProviderQuery();
  const [getSubCategory] = useLazyGetSubCategoryQuery();
  const [providersList, setProviderList] = useState<providerList[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const { t } = useTranslation();
  const router = useRouter();

  const fetchProvider = async () => {
    const params = { categoryName: mainType, subcategoryName: subType };
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
    const params = { categoryName: mainType };
    try {
      const res = await getSubCategory(params).unwrap();
      if (res.status === 'success') {
        setSubCategories(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error: unknown) {
      handleError(error as RTKError);
    }
  };

  useEffect(() => {
    fetchProvider();
  }, [mainType, subType]);

  useEffect(() => {
    fetchSubCategory();
  }, [mainType]);

  return ( 
    <div className="row g-md-3 g-2 mt-1 align-items-center  justify-content-center">
      <div className="col-md-6 col-12">
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
      <div className="col-md-2 col-4">
        <div className="form-floating select-white cursor-pointer">
          <CustomDropdownSelect
            dropdownLabelName={t('Sub categories')}
            options={subCategories.map((item) => ({ name: item, value: item }))}
            subType={subType}
            dropdownFieldName="sortByCategory"
            handleChange={(e: SelectChangeEvent) => {
              router.push({
                pathname: '/games-category',
                query: { mainType, subType: e.target.value },
              });
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
          <label htmlFor="floatingSelect" className="label-dropdown">
            {t('Sort By')}
          </label>
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
        </div>
      </div>
    </div>
  );
};
export default GameFilterBar;
