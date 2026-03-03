import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

const years = ["2022", "2023", "2024", "2025", "2026", "2027", "2028"];
const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export default function FolderTree({ onSelect }) {
  return (
    <SimpleTreeView
      onItemClick={(e, itemId) => {
        const [year, month] = itemId.split("/");
        if (year && month) {
          onSelect({ year, month });
        }
      }}
    >
      {years.map((year) => (
        <TreeItem key={year} itemId={year} label={year}>
          {months.map((month) => (
            <TreeItem
              key={month}
              itemId={`${year}/${month}`}
              label={month}
            />
          ))}
        </TreeItem>
      ))}
    </SimpleTreeView>
  );
}
 