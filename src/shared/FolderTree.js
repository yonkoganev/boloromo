import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { COMPANIES, MARKETPLACES, YEARS, MONTHS } from "./constants";

/**
 * mode:
 *   "company-marketplace-year-month" → sales, accounting, amazon-documents
 *   "year-month"                     → direx
 */
export default function FolderTree({ onSelect, mode = "year-month" }) {
  if (mode === "year-month") {
    return (
      <SimpleTreeView
        onItemClick={(_, itemId) => {
          const [year, month] = itemId.split("/");
          if (year && month) onSelect({ year, month });
        }}
      >
        {YEARS.map((year) => (
          <TreeItem key={year} itemId={year} label={year}>
            {MONTHS.map((month) => (
              <TreeItem key={month} itemId={`${year}/${month}`} label={month} />
            ))}
          </TreeItem>
        ))}
      </SimpleTreeView>
    );
  }
  // company-year-month (amazon documents)
  if (mode === "company-year-month") {
    return (
      <SimpleTreeView
        onItemClick={(_, itemId) => {
          const parts = itemId.split("/");
          if (parts.length === 3) {
            onSelect({ company: parts[0], year: parts[1], month: parts[2] });
          }
        }}
      >
        {COMPANIES.map((company) => (
          <TreeItem key={company} itemId={company} label={company}>
            {YEARS.map((year) => (
              <TreeItem key={year} itemId={`${company}/${year}`} label={year}>
                {MONTHS.map((month) => (
                  <TreeItem key={month} itemId={`${company}/${year}/${month}`} label={month} />
                ))}
              </TreeItem>
            ))}
          </TreeItem>
        ))}
      </SimpleTreeView>
    );
  }
  // company-marketplace-year-month
  return (
    <SimpleTreeView
      onItemClick={(_, itemId) => {
        const parts = itemId.split("/");
        if (parts.length === 4) {
          onSelect({
            company: parts[0],
            marketPlace: parts[1],
            year: parts[2],
            month: parts[3],
          });
        }
      }}
    >
      {COMPANIES.map((company) => (
        <TreeItem key={company} itemId={company} label={company}>
          {MARKETPLACES.map((mp) => (
            <TreeItem key={mp} itemId={`${company}/${mp}`} label={mp}>
              {YEARS.map((year) => (
                <TreeItem key={year} itemId={`${company}/${mp}/${year}`} label={year}>
                  {MONTHS.map((month) => (
                    <TreeItem
                      key={month}
                      itemId={`${company}/${mp}/${year}/${month}`}
                      label={month}
                    />
                  ))}
                </TreeItem>
              ))}
            </TreeItem>
          ))}
        </TreeItem>
      ))}
    </SimpleTreeView>
  );
}
