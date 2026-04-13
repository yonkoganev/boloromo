import { useState } from "react";
import PageLayout from "../shared/PageLayout";
import TreeFileManager from "../shared/TreeFileManager";
import UploadAmazonDocModal from "../components/amazon-documents/UploadAmazonDocModal";

export default function TemuDocumentsPage() {
  const [openUpload, setOpenUpload] = useState(false);

  return (
    <PageLayout title="Temu Documents">
      <TreeFileManager
        category="amazon_document"
        treeMode="company-year-month"
        filterFn={(f, s) =>
          f.company === s.company &&
          f.marketPlace === "Temu" &&
          f.year === s.year &&
          f.month === s.month
        }
        uploadLabel="Upload Documents"
        onUploadClick={() => setOpenUpload(true)}
        uploadModal={
          <UploadAmazonDocModal
            open={openUpload}
            onClose={() => setOpenUpload(false)}
            onUploaded={() => {}}
            marketplace="Temu"
          />
        }
      />
    </PageLayout>
  );
}
