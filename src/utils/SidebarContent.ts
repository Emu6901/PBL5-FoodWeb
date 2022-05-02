import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineShoppingCart
} from 'react-icons/ai';
import { FaShippingFast } from 'react-icons/fa';
export function getSideBarContent(
  nameGroup: 'Customer' | 'Shipper' | 'Admin' | 'Seller'
) {
  const customerSidebar = [
    { icon: AiOutlineHome, iconText: 'Trang chủ', linkTo: '/' },
    {
      icon: AiOutlineUser,
      iconText: 'Thông tin cá nhân',
      linkTo: '/user/profile'
    },
    {
      icon: AiOutlineSetting,
      iconText: 'Bảo mật',
      linkTo: '/user/security'
    },
    {
      icon: AiOutlineShoppingCart,
      iconText: 'Quản lý đơn hàng',
      linkTo: '/user/history-order'
    }
  ];
  const shipperSidebar = [
    {
      icon: AiOutlineUser,
      iconText: 'Thông tin cá nhân',
      linkTo: '/user/profile'
    },
    {
      icon: AiOutlineSetting,
      iconText: 'Bảo mật',
      linkTo: '/user/security'
    },
    {
      icon: AiOutlineShoppingCart,
      iconText: 'Đơn hàng chờ ship',
      linkTo: '/user/not-ship'
    },
    {
      icon: FaShippingFast,
      iconText: 'Đơn hàng của bạn',
      linkTo: '/user/my-ship'
    }
  ];
  if (nameGroup == 'Shipper') return shipperSidebar;
  if (nameGroup == 'Customer') return customerSidebar;
}
