function FooterAdmin() {
    return (
        <footer className="mx-auto container mt-12 border-t border-gray-300 bg-white/70 backdrop-blur-md px-4 py-4 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center">
            <span>© {new Date().getFullYear()} GUESS Admin Dashboard</span>
            <a href="https://github.com/omarzahidli" target="_blank" title="Visit my Github" className="mt-2 md:mt-0 hover:underline">Built by omerzh</a>
        </footer>

    )
}

export default FooterAdmin