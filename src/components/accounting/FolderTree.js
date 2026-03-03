import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

const companies = [
  "AUTOMARKET 22",
  "ARA GROUP",
  "Motosviqt99",
  "MAKSI GROUP",
  "Mk-Market",
];

const marketPlaces = ["eBay", "Temu", "Amazon", "EMAG"];

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
      {companies.map((company) => (
        <TreeItem key={company} itemId={company} label={company}>
          {marketPlaces.map((marketPlace) => (
            <TreeItem
              key={marketPlace}
              itemId={`${company}/${marketPlace}`}
              label={marketPlace}
            >
              {years.map((year) => (
                <TreeItem
                  key={year}
                  itemId={`${company}/${marketPlace}/${year}`}
                  label={year}
                >
                  {months.map((month) => (
                    <TreeItem
                      key={month}
                      itemId={`${company}/${marketPlace}/${year}/${month}`}
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
