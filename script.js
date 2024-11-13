let entries = [];

function addEntry() {
    const revenue = parseFloat(document.getElementById('revenue').value) || 0;
    const expenses = parseFloat(document.getElementById('expenses').value) || 0;
    const profit = revenue - expenses;
    const dateTime = new Date().toLocaleString('fr-FR'); // الحصول على الوقت والتاريخ بالأرقام الفرنسية

    const entry = { revenue, expenses, profit, dateTime };
    entries.push(entry);
    displayEntries();
    calculateTotalProfit();
}

function displayEntries() {
    const tableBody = document.getElementById('entriesTable');
    tableBody.innerHTML = ""; // تفريغ الجدول لإعادة تعبئته

    entries.forEach((entry, index) => {
        const row = document.createElement('tr');

        // استخدام toFixed(0) لإزالة الأصفار بعد الفاصلة
        row.innerHTML = `
            <td>${entry.dateTime}</td>
            <td><input type="number" value="${entry.revenue}" onchange="updateEntry(${index}, 'revenue', this.value)"></td>
            <td><input type="number" value="${entry.expenses}" onchange="updateEntry(${index}, 'expenses', this.value)"></td>
            <td>${entry.profit.toFixed(0)} دج</td>
            <td><button onclick="deleteEntry(${index})">حذف</button></td>
        `;

        tableBody.appendChild(row);
    });
}

function updateEntry(index, field, value) {
    entries[index][field] = parseFloat(value) || 0;
    entries[index].profit = entries[index].revenue - entries[index].expenses;
    displayEntries();
    calculateTotalProfit();
}

function deleteEntry(index) {
    entries.splice(index, 1);
    displayEntries();
    calculateTotalProfit();
}

function calculateTotalProfit() {
    const totalProfit = entries.reduce((sum, entry) => sum + entry.profit, 0);
    // هنا نستخدم toFixed(0) لإزالة الأصفار بعد الفاصلة
    document.getElementById('totalProfit').textContent = totalProfit.toFixed(0) + " دج";
}

// وظيفة الحفظ المباشر
function saveToFileDirectly() {
    let fileContent = "التاريخ والوقت | الإيرادات | النفقات | الربح\n";
    entries.forEach(entry => {
        fileContent += `${entry.dateTime} | ${entry.revenue} | ${entry.expenses} | ${entry.profit.toFixed(0)} دج\n`;
    });
    saveToFile(fileContent);
}

function saveToFile(content) {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "coffee_income.txt";
    link.click();
}

// حفظ البيانات عند الخروج
window.addEventListener("beforeunload", () => {
    let fileContent = "التاريخ والوقت | الإيرادات | النفقات | الربح\n";
    entries.forEach(entry => {
        fileContent += `${entry.dateTime} | ${entry.revenue} | ${entry.expenses} | ${entry.profit.toFixed(0)} دج\n`;
    });
    saveToFile(fileContent);
});