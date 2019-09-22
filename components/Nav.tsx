import { FC, ReactChildren, ReactElement, cloneElement } from 'react'
import classNames from 'classnames'

interface NavItemProps {
  children: ReactChildren;
  active: boolean;
  id: string;
  onChange: (key: string) => void;
}

interface NavProps {
  // FIX
  children: ReactElement<NavItemProps, FC<NavItemProps>>[];
  value: string;
  onChange: (key: string) => void;
}

const Nav = ({ children, value, onChange }: NavProps) => {
  return (
    <div className="nav">
      <style jsx>{`
        .nav {
          display: flex;
          height: 50px;
          align-items: center;
          margin: 0 auto;
          white-space: nowrap;
          border-bottom: 1px solid #eee;
          background-color: #fff;
        }
      `}</style>
      {
        children.map(item => cloneElement(item, {
          active: value === item.key,
          id: item.key as string,
          onChange: onChange
        }))
      }
    </div>
  )
}

Nav.Item = function NavItem ({ children, active, onChange, id }) {
  return (
    <div className={classNames('nav-item', { active })} onClick={() => onChange(id)}>
      <style jsx>{`
        .nav-item {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 0 20px;
          cursor: pointer;
          height: 100%;
          color: #888;
        }

        .nav-item.active {
          color: #f60;
          box-shadow: inset 0 -2px 0 #f60;
        }
      `}</style>
      { children }
    </div>
  )   
}

export default Nav
