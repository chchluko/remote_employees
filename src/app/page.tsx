"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RosterManager() {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeIds, setEmployeeIds] = useState<string[]>([]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [bulkAddInput, setBulkAddInput] = useState("");

  const addEmployee = () => {
    if (employeeId && !employeeIds.includes(employeeId)) {
      setEmployeeIds([...employeeIds, employeeId]);
      setEmployeeId("");
    }
  };

  const removeSelectedEmployees = () => {
    const updatedEmployeeIds = employeeIds.filter(id => !selectedEmployeeIds.includes(id));
    setEmployeeIds(updatedEmployeeIds);
    setSelectedEmployeeIds([]);
  };

  const handleCheckboxChange = (employeeId: string) => {
    setSelectedEmployeeIds(prev => {
      if (prev.includes(employeeId)) {
        return prev.filter(id => id !== employeeId);
      } else {
        return [...prev, employeeId];
      }
    });
  };

  const handleBulkAdd = () => {
    const newIds = bulkAddInput.split(",").map(id => id.trim()).filter(id => id && !employeeIds.includes(id));
    setEmployeeIds([...employeeIds, ...newIds]);
    setBulkAddInput("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Roster Manager</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <Button variant="secondary" onClick={addEmployee}>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Bulk Add (comma-separated)"
            value={bulkAddInput}
            onChange={(e) => setBulkAddInput(e.target.value)}
          />
          <Button variant="secondary" onClick={handleBulkAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Bulk Add
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Button
          variant="destructive"
          onClick={removeSelectedEmployees}
          disabled={selectedEmployeeIds.length === 0}
          className={cn(selectedEmployeeIds.length === 0 && "cursor-not-allowed")}
        >
          <Trash className="mr-2 h-4 w-4" />
          Remove Selected
        </Button>
      </div>

      <div className="mb-4">
        <Badge>Employee Count: {employeeIds.length}</Badge>
      </div>

      <Table>
        <TableCaption>A list of employees on the roster.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Select</TableHead>
            <TableHead>Employee ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeeIds.map(id => (
            <TableRow key={id}>
              <TableCell className="pl-6">
                <Checkbox
                  checked={selectedEmployeeIds.includes(id)}
                  onCheckedChange={() => handleCheckboxChange(id)}
                />
              </TableCell>
              <TableCell>{id}</TableCell>
            </TableRow>
          ))}
          {employeeIds.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} className="text-center">No employees added yet.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
