import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { IconButton, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { adminAPI } from '../../../api/repositoryFactory';
import UserManageList from './UserManageList';
interface UserManageProps {
  nameGroup: string;
  name?: string;
  phone?: string;
  address?: string;
}
function isNumeric(num: any) {
  return !isNaN(num);
}

const UserManagePagnitation = (props: UserManageProps) => {
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    let mounted = true;
    console.log(props.name);
    adminAPI
      .getTotalPageOfRoleBySearch(
        props.nameGroup,
        props.name || '',
        props.phone || '',
        props.address || ''
      )
      .then((res) => {
        if (mounted) {
          setCurrentPage(1);
          setTotalPage(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [props.name, props.phone, props.address]);
  const goToPage = (isIncrease: boolean) => {
    if (isIncrease) {
      if (currentPage > totalPage && totalPage > 0) {
        setCurrentPage((prevPage) => prevPage + 1);
      } else setCurrentPage(1);
    } else {
      if (currentPage == 1 && totalPage > 0) {
        setCurrentPage(totalPage);
      } else {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    }
  };
  const pageOnClick = (event: any) => {
    if (isNumeric(parseInt(event.event.target.textContent))) {
      setCurrentPage(parseInt(event.event.target.textContent));
    } else {
      if (event.event.target.textContent == '>') goToPage(true);
      else goToPage(false);
    }
  };
  return (
    <Stack
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
    >
      <UserManageList
        currentPage={currentPage}
        role={props.nameGroup}
        name={props.name}
        address={props.address}
        phone={props.phone}
        loading={loading}
      />
      {!loading ? (
        totalPage > 0 ? (
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <IconButton
                variant="outline"
                colorScheme="main"
                aria-label="next"
                fontSize={'1.2rem'}
                icon={<ChevronRightIcon />}
              />
            }
            previousLabel={
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="prev"
                fontSize={'1.2rem'}
                icon={<ChevronLeftIcon />}
              />
            }
            pageCount={totalPage || 1}
            containerClassName={'container'}
            pageLinkClassName={'page-link'}
            onClick={pageOnClick}
          />
        ) : null
      ) : null}
    </Stack>
  );
};

export default UserManagePagnitation;
