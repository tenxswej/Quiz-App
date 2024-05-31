function Main() {
    return (
        <div>
            <input
                className="peer sr-only"
                type="radio"
                value="no"
                name="answer"
                id="no"
                checked
            />
            <label
                className="flex justify-center cursor-pointer rounded-full  peer-checked:bg-white py-1 px-3 focus:outline-none peer-checked:border-transparent   transition-all duration-500 ease-in-out font-nunito peer-checked:text-black text-stone-100"
                htmlFor="no"
            >
                AI ✨
            </label>

            <div className="w-full absolute shadow-lg left-0 rounded-lg transition-all duration-500 ease-in-out opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1 overflow-x-hidden py-5">
                <div className="w-full max-w-xl mx-auto">
                    {/* content */}
                </div>
            </div>
        </div>
    )
}

export default Main