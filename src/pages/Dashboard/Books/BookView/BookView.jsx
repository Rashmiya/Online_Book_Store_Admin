import React from "react";
import { Card, Descriptions, Image, Tag, Typography, Rate } from "antd";

const { Title, Paragraph } = Typography;

const BookView = ({ book }) => {
  return (
    <Card style={{ maxWidth: 900, margin: "auto", padding: 24 }}>
      <Title level={2}>{book.title}</Title>

      <div
        style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 24 }}
      >
        {book.cover_images.map((img, index) => (
          <Image
            key={index}
            width={150}
            src={img}
            alt={`Cover ${index + 1}`}
            style={{ borderRadius: 8 }}
          />
        ))}
      </div>

      <Descriptions
        bordered
        column={1}
        size="middle"
        styles={{ fontWeight: "bold", width: 200 }}
      >
        <Descriptions.Item label="Author">{book.author}</Descriptions.Item>
        <Descriptions.Item label="Publisher">
          {book.publisher}
        </Descriptions.Item>
        <Descriptions.Item label="Publication Year">
          {book.pub_year}
        </Descriptions.Item>
        <Descriptions.Item label="ISBN Number">
          {book.ISBN_number}
        </Descriptions.Item>
        <Descriptions.Item label="Price">${book.price}</Descriptions.Item>
        <Descriptions.Item label="Available Quantity">
          {book.qty}
        </Descriptions.Item>
        <Descriptions.Item label="Format">{book.format}</Descriptions.Item>
        <Descriptions.Item label="Pages">
          {book.number_of_pages}
        </Descriptions.Item>
        <Descriptions.Item label="Awarded">
          {book.isAwarded ? "Yes" : "No"}
        </Descriptions.Item>
        <Descriptions.Item label="Rating">
          <Rate allowHalf disabled defaultValue={book.rating} /> ({book.rating})
        </Descriptions.Item>
        <Descriptions.Item label="Types">
          {book.types.map((type, index) => (
            <Tag color="blue" key={index}>
              {type}
            </Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="PDF">
          <a href={book.pdf_file} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        </Descriptions.Item>

        <Descriptions.Item label="Description">
          <Paragraph>{book.description}</Paragraph>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default BookView;
