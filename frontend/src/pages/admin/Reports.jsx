import { downloadReport }
from "../../api/adminApi";

const Reports = () => {

  const download =
    async (type) => {

      const response =
        await downloadReport(type);

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `${type}.csv`
      );

      document.body.appendChild(
        link
      );

      link.click();
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<button
 className="
 bg-blue-500
 text-white
 p-4
 rounded
 "
 onClick={() => download("WEEKLY")}
>
 Weekly Report
</button>

<button
 className="
 bg-green-500
 text-white
 p-4
 rounded
 "
 onClick={() => download("MONTHLY")}
>
 Monthly Report
</button>

<button
 className="
 bg-purple-500
 text-white
 p-4
 rounded
 "
 onClick={() => download("YEARLY")}
>
 Yearly Report
</button>

</div>
  );
};

export default Reports;