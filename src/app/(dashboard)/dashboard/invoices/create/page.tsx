'use client';

import { useState } from 'react';
import { createDocument } from '@/actions/document-actions'; // You need to implement creating Doc
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Trash, Plus } from 'lucide-react';
import { getLeads } from '@/actions/lead-actions'; // Needed to select client
import { useEffect } from 'react';
import { useFormState } from 'react-dom'; // or custom

export default function CreateDocumentPage() {
    const [leads, setLeads] = useState<any[]>([]);

    // Client-side state for form since it has dynamic array
    const [items, setItems] = useState([{ description: '', quantity: 1, rate: 0 }]);
    const [selectedLead, setSelectedLead] = useState('');
    const [docType, setDocType] = useState('QUOTATION');

    useEffect(() => {
        // Fetch leads on mount
        getLeads().then(setLeads);
    }, []);

    const addItem = () => setItems([...items, { description: '', quantity: 1, rate: 0 }]);
    const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));

    const updateItem = (i: number, field: string, value: any) => {
        const newItems = [...items];
        newItems[i] = { ...newItems[i], [field]: value };
        setItems(newItems);
    }

    const handleSubmit = async () => {
        const payload = {
            type: docType,
            relatedLead: selectedLead,
            items,
        }
        await createDocument(payload);
        // Redirect or show success
        alert('Document Created!');
    }

    return (
        <div className="max-w-4xl mx-auto py-8 flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Create New Document</h1>

            <Card>
                <CardContent className="p-6 grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Document Type</label>
                            <Select value={docType} onValueChange={setDocType}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="QUOTATION">Quotation</SelectItem>
                                    <SelectItem value="INVOICE">Invoice</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Select Client</label>
                            <Select value={selectedLead} onValueChange={setSelectedLead}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a lead..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {leads.map(l => (
                                        <SelectItem key={l._id} value={l._id}>
                                            {l.name} ({l.company})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-2">Items</label>
                        {items.map((item, i) => (
                            <div key={i} className="flex gap-2 mb-2 items-center">
                                <Input
                                    className="flex-1"
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) => updateItem(i, 'description', e.target.value)}
                                />
                                <Input
                                    className="w-20"
                                    type="number"
                                    placeholder="Qty"
                                    value={item.quantity}
                                    onChange={(e) => updateItem(i, 'quantity', Number(e.target.value))}
                                />
                                <Input
                                    className="w-24"
                                    type="number"
                                    placeholder="Rate"
                                    value={item.rate}
                                    onChange={(e) => updateItem(i, 'rate', Number(e.target.value))}
                                />
                                <div className="w-24 text-right font-medium">
                                    ₹{item.quantity * item.rate}
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeItem(i)}>
                                    <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={addItem} className="mt-2">
                            <Plus className="h-3 w-3 mr-1" /> Add Item
                        </Button>
                    </div>

                    <div className="flex justify-end">
                        <div className="w-48 text-right">
                            <div className="flex justify-between py-1">
                                <span>Sub Total:</span>
                                <span>₹{items.reduce((a, b) => a + (b.quantity * b.rate), 0)}</span>
                            </div>
                            <div className="flex justify-between py-1 text-muted-foreground">
                                <span>GST (18%):</span>
                                <span>₹{(items.reduce((a, b) => a + (b.quantity * b.rate), 0) * 0.18).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-1 font-bold text-lg border-t mt-2">
                                <span>Total:</span>
                                <span>₹{(items.reduce((a, b) => a + (b.quantity * b.rate), 0) * 1.18).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleSubmit}>Generate PDF</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
