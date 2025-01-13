import SideBar from "../sidebar";
import Header from "../header";

function DefaultLayout({ children, showSidebar }) {
    return (
        <div className="flex flex-row h-auto">
            {showSidebar && (
                <div className="sidebar m-5 hidden lg:block w-96">
                    <SideBar />
                </div>
            )}
            <div className="content w-full">
                <Header/>
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;
