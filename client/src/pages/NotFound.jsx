// File: src/pages/NotFound.jsx

import ErrorPage from "../components/error/ErrorPage";

function NotFound() {
    return (
        <ErrorPage
            code="404"
            title="Page Not Found"
            description="The page you're looking for doesn't exist, may have been moved, or the URL may be incorrect."
            type="not-found"
        />
    );
}

export default NotFound;