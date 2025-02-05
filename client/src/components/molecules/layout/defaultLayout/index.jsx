import SideBar from "../sidebar";
import Header from "../header";

function DefaultLayout({ children, showSidebar }) {
    return (
        <div className="flex h-full w-full">
            {showSidebar && (
                <aside
                    className="sidebar m-5 w-72 h-full flex-shrink-0 hidden lg:block bg-gray-100 shadow-md rounded-md">
                    <SideBar/>
                </aside>
            )}

            <main className="flex-1 overflow-auto h-full">
                {showSidebar && <Header/>}
                {children}
            </main>
        </div>
    );
}

export default DefaultLayout;
