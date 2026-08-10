// File: src/pages/ServerError.jsx

import ErrorPage from "../components/error/ErrorPage";

function ServerError() {
    return (
        <ErrorPage
            code="500"
            title="Something Went Wrong"
            description="Our server encountered an unexpected error. Please try again or return to your dashboard."
            type="server"
        />
    );
}

export default ServerError;