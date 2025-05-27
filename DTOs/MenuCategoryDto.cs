namespace CSMS_Trial.DTOs
{
    public class MenuCategoryDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string? Description { get; set; }
        public bool IsActive { get; set; }
    }
}
