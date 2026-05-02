import Link from "next/link";
import { ReactNode } from "react";
import './menu-item.css';

interface MenuItemProps {
  label: string;
  icon: ReactNode;
  url: string;
}

function MenuItem({
  label,
  icon,
  url,
}: MenuItemProps) {

  return (
    <nav className='menuitem-container'>
      <section className='menu-item'>
        <div className='dropdown-menu'>
          <li>
            <Link
              className='link'
              href={url}
            >
              {icon}
              <span className='close'>{label}</span></Link>
          </li>
        </div>
      </section>
    </nav>
  );
}

export { MenuItem }
