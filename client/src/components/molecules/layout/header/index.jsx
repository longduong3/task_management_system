function Header() {
    return (
        <div className="title-task-board flex items-end justify-end p-5">
            <div className="flex gap-4">
                <div className="flex flex-col items-end">
                    <span className="font-bold">Dylan Hunter</span>
                    <span className="text-sm text-end">Admin Profile</span>
                </div>
                <img className="w-14 h-14 ml-auto rounded-full border" src='https://randomuser.me/api/portraits/women/26.jpg'/>
            </div>
        </div>
    )
}

export default Header
