import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faUser,
  faTractor,
  faWheatAlt,
  faHouseFloodWater,
  faWater,
  faBreadSlice,
  faPerson,
  faBank,
  faFileInvoiceDollar,
  faCoins,
  faBoxOpen,
  faWarehouse,
  faStore,
  faMoneyCheck,
  faCreditCard,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import { colors } from '../../types/types';
import { Link } from 'react-router-dom';

interface icons {
  icon: IconDefinition;
  title: string;
  color: string;
  to: string;
}

const iconsArr: icons[] = [
  {
    icon: faUser,
    title: 'Productores',
    color: colors.pinkAccent,
    to: '/productores',
  },
  { icon: faTractor, title: 'Fincas', color: colors.redAccent, to: '/finca' },
  {
    icon: faWheatAlt,
    title: 'Lotes',
    color: colors.salmonAccent,
    to: '/lote',
  },
  {
    icon: faHouseFloodWater,
    title: 'Tipo de Suelo',
    color: colors.pinkAccent,
    to: '/tipodesuelo',
  },
  {
    icon: faWater,
    title: 'Tipo de Riego',
    color: colors.redAccent,
    to: '/tipoderiego',
  },
  {
    icon: faBreadSlice,
    title: 'Productos',
    color: colors.salmonAccent,
    to: '/productos',
  },
  {
    icon: faPerson,
    title: 'Clientes',
    color: colors.pinkAccent,
    to: '/clientes',
  },
  { icon: faBank, title: 'Bancos', color: colors.redAccent, to: '/bancos' },
  {
    icon: faFileInvoiceDollar,
    title: 'Cuentas Bancarias',
    color: colors.salmonAccent,
    to: '/cuentasbancarias',
  },
  {
    icon: faCoins,
    title: 'Tipo de Moneda',
    color: colors.pinkAccent,
    to: '/tipodemoneda',
  },
  {
    icon: faWarehouse,
    title: 'Bodega',
    color: colors.redAccent,
    to: '/bodega',
  },
  {
    icon: faBoxOpen,
    title: 'Inventario',
    color: colors.salmonAccent,
    to: '/inventario',
  },
  {
    icon: faStore,
    title: 'Proveedores',
    color: colors.pinkAccent,
    to: '/proveedores',
  },
  {
    icon: faMoneyCheck,
    title: 'Cheques',
    color: colors.redAccent,
    to: '/cheques',
  },
  {
    icon: faCreditCard,
    title: 'Compras',
    color: colors.salmonAccent,
    to: '/compras',
  },
  {
    icon: faMoneyBill,
    title: 'Ventas',
    color: colors.pinkAccent,
    to: '/ventas',
  },
];

export const Sidebar = () => {
  return (
    <div className="sidebarContainer">
      <ul className="sidebar">
        {iconsArr.map(({ icon, title, color, to }): JSX.Element => {
          return (
            <li style={{ background: color }}>
              <Link to={to} className="sidebar__link">
                <FontAwesomeIcon icon={icon} size="lg" />
                <span>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
