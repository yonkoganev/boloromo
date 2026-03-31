import { useState } from "react";
import PageLayout from "../shared/PageLayout";
import TreeFileManager from "../shared/TreeFileManager";
import UploadSalesModal from "../components/sales-reports/UploadSalesModal";

export default function SalesReportsPage() {
  const [openUpload, setOpenUpload] = useState(false);
  const [refresh, setRefresh] = useState(0);

  return (
    <PageLayout title="Sales Reports">
      <TreeFileManager
        category="sales"
        treeMode="company-marketplace-year-month"
        filterFn={(f, s) =>
          f.company === s.company &&
          f.marketPlace === s.marketPlace &&
          f.year === s.year &&
          f.month === s.month
        }
        uploadLabel="Upload Sales Report"
        onUploadClick={() => setOpenUpload(true)}
        uploadModal={
          <UploadSalesModal
            open={openUpload}
            onClose={() => setOpenUpload(false)}
            onUploaded={() => setRefresh((r) => r + 1)}
          />
        }
      />
    </PageLayout>
  );
}
