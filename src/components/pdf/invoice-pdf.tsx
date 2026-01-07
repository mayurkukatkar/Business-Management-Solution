import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    section: { margin: 10, padding: 10 },
    table: { display: "flex", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
    tableRow: { margin: "auto", flexDirection: "row" },
    tableCol: { width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
    tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
    totals: { marginTop: 20, alignSelf: 'flex-end', width: 200 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
});

export const InvoicePDF = ({ data }: { data: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>MAYUR TRADING CO.</Text>
                    <Text>123, Market Yard, Pune - 411037</Text>
                    <Text>GSTIN: 27ABCDE1234F1Z5</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 18 }}>{data.type}</Text>
                    <Text>No: {data.number}</Text>
                    <Text>Date: {new Date(data.issuedDate).toLocaleDateString()}</Text>
                </View>
            </View>

            {/* Bill To */}
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontWeight: 'bold', borderBottom: 1, marginBottom: 5 }}>Bill To:</Text>
                <Text>{data.relatedLead?.name}</Text>
                <Text>{data.relatedLead?.company}</Text>
                <Text>{data.relatedLead?.phone}</Text>
            </View>

            {/* Table */}
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={{ ...styles.tableCol, width: '40%' }}>
                        <Text style={styles.tableCell}>Description</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: '20%' }}>
                        <Text style={styles.tableCell}>Qty</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: '20%' }}>
                        <Text style={styles.tableCell}>Rate</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: '20%' }}>
                        <Text style={styles.tableCell}>Amount</Text>
                    </View>
                </View>

                {data.items.map((item: any, i: number) => (
                    <View style={styles.tableRow} key={i}>
                        <View style={{ ...styles.tableCol, width: '40%' }}>
                            <Text style={styles.tableCell}>{item.description}</Text>
                        </View>
                        <View style={{ ...styles.tableCol, width: '20%' }}>
                            <Text style={styles.tableCell}>{item.quantity}</Text>
                        </View>
                        <View style={{ ...styles.tableCol, width: '20%' }}>
                            <Text style={styles.tableCell}>{item.rate}</Text>
                        </View>
                        <View style={{ ...styles.tableCol, width: '20%' }}>
                            <Text style={styles.tableCell}>{item.amount}</Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Totals */}
            <View style={styles.totals}>
                <View style={styles.totalRow}>
                    <Text>Sub Total:</Text>
                    <Text>{data.subTotal.toFixed(2)}</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text>Tax ({data.taxRate}%):</Text>
                    <Text>{data.taxAmount.toFixed(2)}</Text>
                </View>
                <View style={{ ...styles.totalRow, borderTop: 1, paddingTop: 5, fontWeight: 'bold' }}>
                    <Text>TOTAL:</Text>
                    <Text>Rs. {data.totalAmount.toFixed(2)}</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={{ position: 'absolute', bottom: 30, left: 30, right: 30 }}>
                <Text style={{ fontSize: 8, textAlign: 'center', color: 'grey' }}>
                    This is a computer generated document and does not require a signature.
                </Text>
            </View>

        </Page>
    </Document>
);
