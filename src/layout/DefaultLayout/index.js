import Header from "../../components/Header";

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Header/>
            <div>{children}</div>
        </>
    );
};
export default DefaultLayout;
