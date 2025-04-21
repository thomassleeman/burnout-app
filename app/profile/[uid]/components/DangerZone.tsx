"use client";

import { useState } from "react";
import ProfileSection from "./ProfileSection";
import DeleteAccountAlert from "./DeleteAccountAlert";
import ResetAccountAlert from "./ResetAccountAlert";

interface DangerZoneProps {
  userId: string;
}

export default function DangerZone({ userId }: DangerZoneProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showResetAlert, setShowResetAlert] = useState(false);

  return (
    <ProfileSection
      title="Permanently delete data"
      description="Once you reset or delete your account, there is no going back. Please be certain."
      variant="danger"
    >
      <div className="flex flex-wrap gap-4 px-4 py-6">
        <div>
          <button
            className="rounded-md border border-gray-400 px-4 py-2 text-red-500 transition-colors hover:bg-red-50"
            onClick={() => setShowResetAlert(true)}
          >
            Reset my account
          </button>
          {showResetAlert && (
            <ResetAccountAlert
              open={showResetAlert}
              setOpen={setShowResetAlert}
            />
          )}
        </div>

        <div>
          <button
            className="rounded-md border border-gray-400 px-4 py-2 text-red-500 transition-colors hover:bg-red-50"
            onClick={() => setShowDeleteAlert(true)}
          >
            Delete my account
          </button>
          {showDeleteAlert && (
            <DeleteAccountAlert
              open={showDeleteAlert}
              setOpen={setShowDeleteAlert}
            />
          )}
        </div>
      </div>
    </ProfileSection>
  );
}
