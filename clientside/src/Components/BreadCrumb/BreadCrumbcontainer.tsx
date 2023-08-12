import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function BreadCrumbContainer() {
  const BreadCrumbValue = useSelector(
    (state: any) => state.UtilsReducer.breadCrumbs
  );

  return (
    <>
      <Breadcrumb className="breadCrumb" separator=">">
        {BreadCrumbValue?.map((breadCrumb: any) => (
          <Breadcrumb.Item href="">
            <NavLink to={breadCrumb.href}>{breadCrumb.title}</NavLink>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </>
  );
}