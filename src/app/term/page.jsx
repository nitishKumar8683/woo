import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const PlayZoneRules = () => {
  return (
    <div
      className="relative bg-gray-100 min-h-screen bg-cover bg-center bg-no-repeat px-4 py-8 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/image-woo.jpeg')" }}
    >
      {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}
      <div className="relative mx-auto max-w-3xl rounded-lg bg-white bg-opacity-90 p-8 shadow-lg space-y-8">
        <h1 className="text-gray-800 text-2xl font-extrabold leading-tight mb-6">
          The Wiggly Woo Play Zone Rules and Regulations
        </h1>
        <ol className="text-gray-700 list-inside list-decimal space-y-6 pl-6">
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-blue-500" />
            <p>
              The Wiggly Woo team constantly monitors the play zone to ensure a
              safe environment for all visitors. However, parents or guardians
              are ultimately responsible for their children’s well-being.
            </p>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-blue-500" />
            <p>
              Children and guardians are kindly requested to wear socks at all
              times while enjoying the Wiggly Woo play area. Shoes are not
              allowed, and barefoot play is prohibited.
            </p>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-blue-500" />
            <p>
              The play equipment in our Wiggly Woo zone is specifically designed
              for children’s enjoyment. Parents are encouraged to guide and
              support their children but are asked not to use the equipment
              themselves.
            </p>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-blue-500" />
            <p>
              For the cleanliness and safety of everyone, we kindly ask that no
              outside food or drinks be brought into the Wiggly Woo play area.
              Our cafe offers a delightful selection of snacks and beverages for
              your convenience.
            </p>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-blue-500" />
            <p>
              While we do our best to maintain a secure environment, the Wiggly
              Woo team cannot be held responsible for any loss, theft, or damage
              to personal belongings.
            </p>
          </li>
        </ol>
        <div className="bg-blue-50 p-6 rounded-md border border-blue-200 mt-8">
          <h2 className="text-blue-800 text-xl font-semibold mb-4">
            Important Note
          </h2>
          <p className="text-gray-800 mb-2">
            <strong>Note:</strong> Please fill out the details below if the
            child exceeds 1 hour in the Wiggly Woo play zone.
          </p>
          <p className="text-gray-700">
            *If the child exceeds 1 hour up to 30 minutes, then charges will be
            applicable. If he/she exceeds 1 hour 30 minutes, then 2 hours
            charges will be applicable. (No reminder from our side will be
            issued)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayZoneRules;
