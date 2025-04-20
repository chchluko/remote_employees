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
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredEmployeeIds = employeeIds.filter(id =>
    id.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Remote Manager</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Número de Nómina"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <Button variant="secondary" onClick={addEmployee}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Empleado
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Agregar múltiples empleados (Nóminas, separadas por comas)"
            value={bulkAddInput}
            onChange={(e) => setBulkAddInput(e.target.value)}
          />
          <Button variant="secondary" onClick={handleBulkAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Múltiples
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
          Remover los seleccionados
        </Button>
      </div>

      <div className="mb-4">
        <Badge>Número de Empleados: {employeeIds.length}</Badge>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Buscar por número de nómina"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>

        <TableCaption>Lista de Empleados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Seleccionar</TableHead>
            <TableHead>Número de Nómina</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployeeIds.map(id => (
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
          {filteredEmployeeIds.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} className="text-center">No hay empleados agregados.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
