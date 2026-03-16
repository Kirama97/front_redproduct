import React from "react";

const Notification = () => {
  return (
    <div className="absolute top-[60px] right-[20px] w-80 rounded-lg bg-white shadow-lg border border-neutral-200">

      {/* HEADER */}
      <div className="border-b px-4 py-2">
        <h3 className="text-sm font-semibold text-neutral-600">
          Notifications
        </h3>
      </div>

      {/* LISTE */}
      <div className="max-h-40 overflow-y-auto">
        <ol className="list-decimal list-inside text-xs text-neutral-600 p-3 space-y-1">

          <li className="hover:bg-neutral-100 p-2 rounded cursor-pointer">
            Connexion réussie
          </li>

          <li className="hover:bg-neutral-100 p-2 rounded cursor-pointer">
            Hôtel ajouté avec succès
          </li>

          <li className="hover:bg-neutral-100 p-2 rounded cursor-pointer">
            Données mises à jour
          </li>

        </ol>
      </div>

    </div>
  );
};

export default Notification;