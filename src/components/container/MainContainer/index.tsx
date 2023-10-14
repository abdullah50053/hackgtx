import Toolbar from "@/components/Toolbar";

interface MainContainerProps {

}

export default function MainContainer({}: MainContainerProps) {
    return (
        <div className="flex flex-grow flex-row m-0 p-0 justify-center w-auto h-full bg-yellow-500 overflow-y-auto items-start">
            <Toolbar />
        </div>
    )
}