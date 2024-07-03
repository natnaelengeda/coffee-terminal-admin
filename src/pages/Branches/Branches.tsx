
// Components
import AddBranch from "./components/AddBranch";
import ViewBranches from "./components/ViewBranches";

export default function Branches() {
  return (
    <div className="w-full h-full min-h-screen py-5">
      <div className="mx-auto container h-full flex flex-col gap-5 md:gap-20 md:px-3 px-5">
        {/* Add Branch */}
        <div className="w-full h-auto flex flex-col items-start justsify-start">

          {/* Title */}
          <div className="w-full flex flex-col gap-2 items-start justify-start">
            <h1 className="text-3xl">Add Branch</h1>
            <div className="w-60">
              <hr className="border border-black" />
            </div>
          </div>

          {/* Button */}
          <AddBranch />

        </div>

        {/* View Branchs */}
        <div className="w-full h-auto flex flex-col items-start justsify-start">

          {/* Title */}
          <div className="w-full flex flex-col gap-2 items-start justify-start">
            <h1 className="text-3xl">View Branchs</h1>
            <div className="w-60">
              <hr className="border border-black" />
            </div>
          </div>

          {/* Button */}
          <ViewBranches />

        </div>
      </div>
    </div>
  )
}
